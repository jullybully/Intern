namespace webapi.Models
{
    public class Pizza
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public List<Topping> Toppings { get; set; }

        public decimal TotalCost { get; set; }
    }
}
