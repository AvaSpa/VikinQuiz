using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Mappers
{
    public interface IEntityMapper<in TEntity, out TModel>
    {
        TModel Map(TEntity entity);
    }
}
