using Microsoft.EntityFrameworkCore;

namespace Zuge.Infrastructure.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    
}