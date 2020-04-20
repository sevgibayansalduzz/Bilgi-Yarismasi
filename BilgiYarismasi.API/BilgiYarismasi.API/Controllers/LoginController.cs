using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using BilgiYarismasi.API.HubConfig;
using BilgiYarismasi.API.Models;
using BilgiYarismasi.API.TimerFeatures;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BilgiYarismasi.API.Controllers
{
    // Allow CORS for all origins. (Caution!)
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        //We are using the IHubContext interface to create its instance via dependency injection.
        private IHubContext<UserStatuHub> _hub;

        //static private ConcurrentDictionary<string, Login> users = new ConcurrentDictionary<string, Login>();

        public LoginController(IHubContext<UserStatuHub> hub)
        {
            _hub = hub;
        }

        // GET: api/<controller> 
        public ActionResult Get()
        {
            /*in the Get action, we are instantiating the TimerManager class and providing a callback function as a parameter.
             /* This callback function will be executed every two seconds.*/
            /*_hub.Clients.All.SendAsync("transferusersdata", DataManager.GetData()) expression. With it, we are sending generated data to all
             * subscribed clients on the transferusersdata event. This means that every client if it has a listener on the transferusersdata event,
             * will receive users list. .*/
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("transferusersdata",UserStatuHub.Get().Values));
            return Ok(UserStatuHub.Get().Values);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        //  public async Task<ActionResult<string>> Get(int id)
        public ActionResult Get(string id)
        {

            if (UserStatuHub.Get().ContainsKey(id))
            {
                Login itemVal;
                UserStatuHub.Get().TryGetValue(id, out itemVal);
                var timerManager = new TimerManager(() => _hub.Clients.Client(id).SendAsync("transferuser", itemVal));/*get fonksiyonu kendi idsi ile çağıran client 
                için kendi bilgileri sadece ona göneriliyor çümkü Client(id) kullanıldı. */
                return Ok(itemVal);
            }
            return Ok("cannnot found");
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody] Login value)
        {

            UserStatuHub.AddList(value.UserId, value);
            if (UserStatuHub.Get().Count > 1)
                findCompetitor(value);
        }

        private void findCompetitor(Login value)
        {
            if (string.Compare(value.Statu, "Bekliyor") == 0)
            {
                for (int i = 0; i < UserStatuHub.Get().Count; ++i)//unsorted array olduğundan linear search yapmak daha mantıklı
                {
                    if (string.Compare(UserStatuHub.Get().Values.ElementAt(i).Statu, "Bekliyor") == 0 && UserStatuHub.Get().Values.ElementAt(i).UserId != value.UserId)
                    {
                        UserStatuHub.Get().Values.ElementAt(i).Statu = "Hazır";
                        UserStatuHub.Get().Values.ElementAt(i).GameId = UserStatuHub.Get().GetOrAdd(value.UserId, value).UserId;

                        UserStatuHub.Get().GetOrAdd(value.UserId, value).Statu = "Hazır";
                        UserStatuHub.Get().GetOrAdd(value.UserId, value).GameId = UserStatuHub.Get().Values.ElementAt(i).UserId;

                    }
                }
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
