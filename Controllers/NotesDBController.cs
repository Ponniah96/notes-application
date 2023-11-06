using Dapper;
using Microsoft.AspNetCore.Mvc;
using NotesApplication.Models;
using System;
using System.Data.SqlClient;
using System.Text.Json.Nodes;
using System.Xml.Linq;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NotesApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class NotesDBController : ControllerBase
    {
        private const string APIKeyName = "x-api-key";

       
        [HttpPost]
        [Route("CreateNotes")]
        public string CreateNotes([FromBody] string request)
        {
            var getNotesDetails = JsonObject.Parse(request);
            var Notes = getNotesDetails["Notes"];
            var user = getNotesDetails["user"];

            string NewNotes = (string)Notes;
            string Newuser = (string)user;
            string secretKeys = Guid.NewGuid().ToString();

            SqlConnection connection = null;
            string connectionString = "data source=DEV-LPT336\\SQLEXPRESS; database=NotesApplication;integrated security=SSPI";
            connection = new SqlConnection(connectionString);
            connection.Open();

            var insertQueryRecord = "Insert into Notes values (@notes,@user,@secretKey)";
            var insertParamsValue = new { notes = NewNotes, user = Newuser, secretKey= secretKeys };
            var insertNewRecord = connection.Execute(insertQueryRecord, insertParamsValue);

            if (insertNewRecord == 1)
            {
                return secretKeys;
            }
            else
            {
                return "Issue in Database";
            }
            
        }

        
        [HttpGet("{id}")]
        [Route("FetchNotesRecord/{id}")]
        public IEnumerable<NotesDBModel> FetchNotesRecord(string id)
        {
            SqlConnection connection = null;
            string connectionString = "data source=DEV-LPT336\\SQLEXPRESS; database=NotesApplication;integrated security=SSPI";
            connection = new SqlConnection(connectionString);
            connection.Open();
            
            var insertQueryRecord = "select * from Notes where secretKey = @secretKeys";
            var insertParamsValue = new { secretKeys = id};
            IEnumerable<NotesDBModel> data = connection.Query<NotesDBModel>(insertQueryRecord, insertParamsValue);
            return data.ToArray();
        }

        
        [HttpPut("{id}")]
        [Route("EditNotesData/{id}")]
        public int Put(int id, [FromBody] string request)
        //public int Put(int id, [FromBody] NotesDBModel request)
        {
          
            var getNotesDetails = JsonObject.Parse(request);
            var Notes = getNotesDetails["Notes"];
            var user = getNotesDetails["user"];

            string NewNotes = (string)Notes;
            string Newuser = (string)user;

            SqlConnection connection = null;
            string connectionString = "data source=DEV-LPT336\\SQLEXPRESS; database=NotesApplication;integrated security=SSPI";
            connection = new SqlConnection(connectionString);
            connection.Open();

            var insertQueryRecord = "Update Notes set notes=@notes, users=@user where ID = @getID";
            var insertParamsValue = new { notes = NewNotes, user = Newuser, getID = id };
            var insertNewRecord = connection.Execute(insertQueryRecord, insertParamsValue);
            return insertNewRecord;
        }

       
        [HttpDelete("{id}")]
        [Route("DeleteNotesRecord/{id}")]
        public int Delete(int id)
        {
            SqlConnection connection = null;
            string connectionString = "data source=DEV-LPT336\\SQLEXPRESS; database=NotesApplication;integrated security=SSPI";
            connection = new SqlConnection(connectionString);
            connection.Open();

            var insertQueryRecord = "Delete from Notes where ID = @getID";
            var insertParamsValue = new { getID = id };
            var insertNewRecord = connection.Execute(insertQueryRecord, insertParamsValue);
            return insertNewRecord;
        }

    }
}




/*var data = request;
          return 1;*/