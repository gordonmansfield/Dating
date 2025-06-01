
using API.Data;
using API.Dtos;
using API.Interfaces;
using AutoMapper;
using AutoMapper.Execution;
using Dating.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseAPIController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();
        if (users == null || !users.Any())
        {
            return NotFound("No users found.");
        }
        return Ok(users);
    }


    [HttpGet("{username}")]  // api/user/{username} 
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var user = await userRepository.GetMemberAsync(username);
        if (user == null)
        {
            return NotFound();
        }
        return mapper.Map<MemberDto>(user);
    }

    [HttpGet("{id:int}")]  // api/user/{id}
    public async Task<ActionResult<MemberDto>> GetUserById(int id)
    {
        var user = await userRepository.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return mapper.Map<MemberDto>(user);
    }
}