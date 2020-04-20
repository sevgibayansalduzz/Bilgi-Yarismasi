using BilgiYarismasi.API.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgiYarismasi.API.HubConfig
{
    public class UserStatuHub : Hub
    {

        static ConcurrentDictionary<string, Login> users = new ConcurrentDictionary<string, Login>();
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("GetConnectionId", this.Context.ConnectionId);
        }
        public static ConcurrentDictionary<string, Login> Get()
        {
            return users;
        }
        public static bool AddList( string connectionId, Login user)
        {
            return users.TryAdd(connectionId, user);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            string connectionId = Context.ConnectionId;
            RemoveUser(connectionId);
            await base.OnDisconnectedAsync(exception);
        }
        public Task SendPrivateMessage(string user, string message)
        {
            return Clients.Client(user).SendAsync("ReceiveMessage", message);
        }
        public Task SendClickInfo(string user, int score)
        {
            return Clients.Client(user).SendAsync("ClickMessage", score);
        }

        public void RemoveUser(string connectionId)
        {
            Login _user, competitor;
            users.TryRemove(connectionId, out _user);
            if (string.Compare(_user.GameId, "") != 0)
            {
                users.TryGetValue(_user.GameId, out competitor);
                competitor.GameId = "";
                competitor.Statu = "Bekliyor";
                _ = SendPrivateMessage(competitor.UserId, _user.Name);
            }
        }
    }
}


