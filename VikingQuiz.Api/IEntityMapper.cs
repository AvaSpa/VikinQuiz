using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VikingQuiz.Api
{
    public interface IEntityMapper<in TEntity, out TModel>
    {
        TModel Map(TEntity entity);
    }

    public class CustomerToViewModelMapper : IEntityMapper<Customer, CustomerViewModel>
    {
        public CustomerViewModel Map(Customer entity)
        {
            var result = new CustomerViewModel
            {
                Name = entity.Name
                // map properties from db model to viewmodel
            };
            return result;
        }
    }

    public class CustomerViewModelToEntityMapper : IEntityMapper<CustomerViewModel, Customer>
    {
        public Customer Map(CustomerViewModel entity)
        {
            var result = new Customer
            {
                Name = entity.Name
                // map properties from db model to viewmodel
            };
            return result;
        }
    }

    // dummy db model
    public class Customer
    {
        public string Name { get; set; }
    }

    // dummy viewmodel
    public class CustomerViewModel
    {
        public string Name { get; set; }
    }

    // dummy controller
    public class MyController
    {
        public void Get()
        {
            var entityToVmMapper = new CustomerToViewModelMapper();
            var vmToEntityMapper = new CustomerViewModelToEntityMapper();
            var customer = new Customer(); //conext.Customers.FirstOrDefault();
            var viewmodel = entityToVmMapper.Map(customer);
            var entity = vmToEntityMapper.Map(viewmodel);
        }
    }
}