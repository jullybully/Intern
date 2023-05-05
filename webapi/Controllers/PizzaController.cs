using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaDbContext _context;

        public PizzaController(PizzaDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreatePizza(Pizza pizza)
        {
            try
            {
                // calculate total cost
                var sizeCost = 0m;
                if (pizza.Size.ToLower() == "small")
                {
                    sizeCost = 8m;
                }
                else if (pizza.Size.ToLower() == "medium")
                {
                    sizeCost = 10m;
                }
                else if (pizza.Size.ToLower() == "large")
                {
                    sizeCost = 12m;
                }
                var toppingCost = pizza.Toppings.Sum(t => t.Cost);
                var discount = sizeCost + toppingCost;
                var totalCost = sizeCost + toppingCost;
                if (pizza.Toppings.Count > 3)
                {
                    discount *= 0.1m;
                    totalCost = totalCost - discount;
                }

                pizza.TotalCost = totalCost;

                _context.Pizzas.Add(pizza);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Pizza>>> GetPizzas()
        {
            try
            {
                var pizzas = await _context.Pizzas.Include(p => p.Toppings).ToListAsync();
                return Ok(pizzas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pizza>> GetPizzaById(int id)
        {
            try
            {
                var pizza = await _context.Pizzas.Include(p => p.Toppings).FirstOrDefaultAsync(p => p.Id == id);
                if (pizza == null)
                {
                    return NotFound();
                }
                return Ok(pizza);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

