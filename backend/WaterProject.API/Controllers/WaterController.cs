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
        public IEnumerable<Project> Get()
        {
            return _waterContext.Projects.ToList();
        }
    }
}