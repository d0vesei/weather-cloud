using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherOnMarsApp.Models;

namespace WeatherOnMarsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherDatumController : Controller
    {
        private readonly WeatherOnMarsContext _context;

        public WeatherDatumController(WeatherOnMarsContext context)
        {
            _context = context;
        }

        // MVC Actions
        // GET: WeatherDatum
        [HttpGet]
        [Route("~/WeatherDatum")]
        public async Task<IActionResult> Index()
        {
            return View(await _context.WeatherData.ToListAsync());
        }

        // GET: WeatherDatum/Details/5
        /// GET (api/json): api/weatherdatum/5
        [HttpGet]
        [Route("~/WeatherDatum/Details/{id?}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var weatherDatum = await _context.WeatherData.FirstOrDefaultAsync(m => m.Id == id);
            if (weatherDatum == null)
            {
                return NotFound();
            }

            return View(weatherDatum);
        }

        // GET: WeatherDatum/Create
        [HttpGet]
        [Route("~/WeatherDatum/Create")]
        public IActionResult Create()
        {
            return View();
        }

        // POST: WeatherDatum/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("~/WeatherDatum/Create")]
        public async Task<IActionResult> Create([Bind("Id,TerrestrialDate,MinTemp,MaxTemp,WindSpeed,Pressure,AtmoOpacity")] WeatherDatum weatherDatum)
        {
            if (ModelState.IsValid)
            {
                _context.Add(weatherDatum);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(weatherDatum);
        }

        // GET: WeatherDatum/Edit/5
        [HttpGet]
        [Route("~/WeatherDatum/Edit/{id?}")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var weatherDatum = await _context.WeatherData.FindAsync(id);
            if (weatherDatum == null)
            {
                return NotFound();
            }
            return View(weatherDatum);
        }

        // POST: WeatherDatum/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("~/WeatherDatum/Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("Id,TerrestrialDate,MinTemp,MaxTemp,WindSpeed,Pressure,AtmoOpacity")] WeatherDatum weatherDatum)
        {
            if (id != weatherDatum.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(weatherDatum);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WeatherDatumExists(weatherDatum.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(weatherDatum);
        }

        // GET: WeatherDatum/Delete/5
        [HttpGet]
        [Route("~/WeatherDatum/Delete/{id?}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var weatherDatum = await _context.WeatherData.FirstOrDefaultAsync(m => m.Id == id);
            if (weatherDatum == null)
            {
                return NotFound();
            }

            return View(weatherDatum);
        }

        // POST: WeatherDatum/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Route("~/WeatherDatum/Delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var weatherDatum = await _context.WeatherData.FindAsync(id);
            if (weatherDatum != null)
            {
                _context.WeatherData.Remove(weatherDatum);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        private bool WeatherDatumExists(int id)
        {
            return _context.WeatherData.Any(e => e.Id == id);
        }

        // API Actions
        // GET: api/WeatherDatum
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherDatum>>> GetWeatherData()
        {
            return await _context.WeatherData.ToListAsync();
        }

        // GET: api/WeatherDatum/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherDatum>> GetWeatherDatum(int id)
        {
            var weatherDatum = await _context.WeatherData.FindAsync(id);
            if (weatherDatum == null)
            {
                return NotFound();
            }
            return weatherDatum;
        }
    }
}
