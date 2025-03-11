using namespace System.Net
param($Request)
Function Stop-VMAction {
    Stop-AzVM -ResourceGroupName $Request.Query.ResourceGroupName -Name $Request.Query.Name -NoWait -Force
}

Function Get-Report {
    $vmAction = Stop-VMAction
    $VmReport = $vmAction | Select-Object "IsSuccessStatusCode", "StatusCode", "ReasonPhrase"
    $VmReport
}

$Request.Query.ResourceGroupName
$Request.Query.Name

$report = Get-Report
if ($report.IsSuccessStatusCode -eq $true) {
    $report  | Add-Member -NotePropertyName Output -NotePropertyValue "VM Stop Signal Sent"
    $statusCode = [HttpStatusCode]::Accepted
}
else {
    $report  | Add-Member -NotePropertyName Output -NotePropertyValue "VM Stop Signal Failed"
    $statusCode = [HttpStatusCode]::InternalServerError
}

$json = $report | ConvertTo-Json

Push-OutputBinding -Name Response -Value (@{
        StatusCode  = $statusCode
        ContentType = "text/json"
        Body        = $json
    })