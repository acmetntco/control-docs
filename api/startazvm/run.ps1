using namespace System.Net
param($Request)
Function Start-VMAction {
    Start-AzVM -ResourceGroupName $Request.Query.ResourceGroupName -Name $Request.Query.Name -NoWait
}

Function Get-Report {
    $vmAction = Start-VMAction
    $VmReport = $vmAction | Select-Object "IsSuccessStatusCode", "StatusCode", "ReasonPhrase"
    $VmReport
}

$Request.Query.ResourceGroupName
$Request.Query.Name

$report = Get-Report
if ($report.IsSuccessStatusCode -eq $true) {
    $report  | Add-Member -NotePropertyName Output -NotePropertyValue "VM Start Signal Sent"
    $statusCode = [HttpStatusCode]::Accepted
}
else {
    $report  | Add-Member -NotePropertyName Output -NotePropertyValue "VM Start Signal Failed"
    $statusCode = [HttpStatusCode]::InternalServerError
}

$json = $report | ConvertTo-Json

Push-OutputBinding -Name Response -Value (@{
        StatusCode  = $statusCode
        ContentType = "text/json"
        Body        = $json
    })