using System.ComponentModel.DataAnnotations;

namespace Commander.Dtos
{
    public class CommandCreateDto
    {
       

        [Required]
        [MaxLength(250)]
        public string Title { get; set; }
        
        [Required]
        public string Text { get; set; }
        
        [Required]
        public string State { get; set; }
    }
}