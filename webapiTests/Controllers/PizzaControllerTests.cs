using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using webapi.Controllers;
using webapi.Data;
using webapi.Models;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace webapi.Tests.Controllers
{
    [TestFixture]
    public class PizzaControllerTests
    {
        private PizzaDbContext? _dbContext;
        private PizzaController? _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<PizzaDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _dbContext = new PizzaDbContext(options);
            _controller = new PizzaController(_dbContext);
        }

        [Test]
public async Task CreatePizza_ShouldCreateNewPizza()
{
    // Arrange
    var options = new DbContextOptionsBuilder<PizzaDbContext>()
        .UseInMemoryDatabase(databaseName: "PizzaDatabase")
        .Options;

    using (var context = new PizzaDbContext(options))
    {
        var controller = new PizzaController(context);
        var pizza = new Pizza
        {
            Size = "Small",
            Toppings = new List<Topping>
            {
                new Topping { Name = "Cheese", Cost = 1m },
                new Topping { Name = "Pepperoni", Cost = 2m },
                new Topping { Name = "Mushrooms", Cost = 3m }
            }
        };

        // Act
        var result = await controller.CreatePizza(pizza);

        // Assert
        Assert.IsType<OkResult>(result);
        Assert.AreEqual(8m + 1m + 2m + 3m, pizza.TotalCost, 0.01m);
    }
}
}