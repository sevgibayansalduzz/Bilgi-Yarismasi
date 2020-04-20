using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilgiYarismasi.API.Models
{
    public class Question
    {
        public int Id { get; set; }

        public string QuestionText { get; set; }

        public string Choice1 { get; set; }

        public string Choice2 { get; set; }

        public string Choice3 { get; set; }

        public string Choice4 { get; set; }

        public string Answer { get; set; }


    }
}
