using System;
using Dating.API.Entities; // Importing the AppUser entity class
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }   // This property represents the Users table in the database
   
}

