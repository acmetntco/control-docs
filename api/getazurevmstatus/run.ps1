using namespace System.Net
param($Request)
Function Get-VMStatus {
    get-Azvm -Status 
}

Function Get-JSONReport {
    $VMsStatus = Get-VMStatus
    $VmsJSONReport = $VMsStatus | Select-Object "ResourceGroupName", "Name", "PowerState","Location" | ConvertTo-Json -AsArray
    $VmsJSONReport
}

$json = Get-JSONReport

Push-OutputBinding -Name Response -Value (@{
        StatusCode  = [HttpStatusCode]::OK
        ContentType = "text/json"
        Body        = $json
    })