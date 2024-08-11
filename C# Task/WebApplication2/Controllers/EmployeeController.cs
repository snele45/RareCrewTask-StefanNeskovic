using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using WebApplication2.Models;

[Route("api/[controller]")]
public class EmployeeController : Controller
{
    private static readonly string apiUrl = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";

    [HttpGet("GetEmployeesHtml")]
    public async Task<IActionResult> GetEmployeesHtml()
    {
        var timeEntries = await GetTimeEntries();
        var employees = CalculateTotalHours(timeEntries);
        employees = employees.OrderByDescending(e => e.TotalTimeWorked).ToList();
        var htmlContent = GenerateHtmlTable(employees);
        return Content(htmlContent, "text/html");
    }

    

    private async Task<List<TimeEntry>> GetTimeEntries()
    {
        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetStringAsync(apiUrl);
            var timeEntries = JsonConvert.DeserializeObject<List<TimeEntry>>(response);
            return timeEntries;
        }
    }

    private List<Employee> CalculateTotalHours(List<TimeEntry> timeEntries)
    {
        var hoursMap = new Dictionary<string, double>();

        foreach (var entry in timeEntries)
        {
            if (!string.IsNullOrEmpty(entry.EmployeeName))
            {
                var totalHours = CalculateTotalHours(entry.StarTimeUtc, entry.EndTimeUtc);
                if (hoursMap.ContainsKey(entry.EmployeeName))
                {
                    hoursMap[entry.EmployeeName] += totalHours;
                }
                else
                {
                    hoursMap[entry.EmployeeName] = totalHours;
                }
            }
        }

        return hoursMap.Select(kv => new Employee
        {
            Name = kv.Key,
            TotalTimeWorked = (int)kv.Value
        }).ToList();
    }

    private double CalculateTotalHours(string start, string end)
    {
        var startDate = DateTime.Parse(start);
        var endDate = DateTime.Parse(end);
        return (endDate - startDate).TotalHours;
    }

    private string GenerateHtmlTable(List<Employee> employees)
    {
        var sb = new StringBuilder();

        sb.Append("<html>");
        sb.Append("<head>");
        sb.Append("<style>");
        sb.Append("table, th, td { border: 1px solid #0000ff; border-collapse: collapse; } .highlight { background-color: yellow; }");
        sb.Append("</style>");
        sb.Append("</head>");
        sb.Append("<body>");
        sb.Append("<h1>Employee Work Hours</h1>");
        sb.Append("<table>");
        sb.Append("<thead>");
        sb.Append("<tr>");
        sb.Append("<th>Name</th>");
        sb.Append("<th>Total Time Worked</th>");
        sb.Append("</tr>");
        sb.Append("</thead>");
        sb.Append("<tbody>");

        foreach (var employee in employees)
        {
            var rowClass = employee.TotalTimeWorked < 100 ? "highlight" : "";
            sb.AppendFormat("<tr class='{0}'>", rowClass);
            sb.AppendFormat("<td>{0}</td>", employee.Name);
            sb.AppendFormat("<td>{0}</td>", employee.TotalTimeWorked);
            sb.Append("</tr>");
        }

        sb.Append("</tbody>");
        sb.Append("</table>");
        sb.Append("</body>");
        sb.Append("</html>");

        return sb.ToString();
    }

    

}
