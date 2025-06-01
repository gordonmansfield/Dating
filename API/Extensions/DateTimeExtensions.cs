namespace  API.Extensions;

using System;


public static class DateTimeExtensions
{
    /// <summary>
    /// Converts a DateOnly to a DateTime at the start of the day.
    /// </summary>
    /// <param name="date">The DateOnly to convert.</param>
    /// <returns>A DateTime representing the start of the day for the given DateOnly.</returns>
    public static DateTime StartOfDay(this DateOnly date)
    {
        return date.ToDateTime(new TimeOnly(0, 0));
    }

    /// <summary>
    /// Converts a DateOnly to a DateTime at the end of the day.
    /// </summary>
    /// <param name="date">The DateOnly to convert.</param>
    /// <returns>A DateTime representing the end of the day for the given DateOnly.</returns>
    public static DateTime EndOfDay(this DateOnly date)
    {
        return date.ToDateTime(new TimeOnly(23, 59, 59));
    }

    public static int CalculateAge(this DateOnly dob)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var age = today.Year - dob.Year;

        // Adjust if the birthday hasn't occurred yet this year
        if (dob > today.AddYears(-age))
        {
            age--;
        }

        return age;
    }

}
