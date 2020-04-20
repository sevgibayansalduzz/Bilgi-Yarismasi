using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BilgiYarismasi.API.Controllers
{

    [Route("api/[controller]")]
    public class QuizController : Controller
    {
        private Data.DataContext _context;
        public QuizController(Data.DataContext context)
        {
            _context = context;
        }
        // GET api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }


        // GET api/<controller>/5
        [HttpGet("{id}")]
        public void Get(int id)
        {
         
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
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
