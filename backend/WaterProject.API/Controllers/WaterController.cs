using Microsoft.AspNetCore.Mvc;
using WaterProject.API.data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }
        
        [HttpGet("AllProjects")]
        public IActionResult Get(int pageSize = 10, int pageNum = 1)
        {
            var something = _waterContext.Projects
                .Skip(pageSize * (pageNum - 1))
                .Take(pageSize)
                .ToList();
            var totalNumProjects = _waterContext.Projects.Count();
            
            return Ok(new
            {
                Projects = something,
                totalNumProjects = totalNumProjects
            });
        }
    }
}