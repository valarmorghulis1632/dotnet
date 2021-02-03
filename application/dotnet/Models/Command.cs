using System;
using System.ComponentModel.DataAnnotations;

namespace Commander.Models
{
    public class Command
    {
        
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Title { get; set; }
        
        [Required]
        public string Text { get; set; }
        
        [Required]
        public string State { get; set; }

        

    }
}