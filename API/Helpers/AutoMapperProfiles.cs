namespace  API.Helpers;
using API.Dtos;
using API.Extensions;
using AutoMapper;
using Dating.API.Entities;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()))
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain)!.Url));

        CreateMap<Photo, PhotoDto>();
    }
}