##################################################
#            Kyocera KX Driver (arm64)           #
#               Uninstall v2022.4.4              #
#                                                #
#         (c) Lennart Dreves - LennMedia         #
##################################################

##############################
# Configuration              #
##############################
Param
(
    [Parameter(Mandatory = $True)]
    [string]$PrinterName,
    [Parameter(Mandatory = $True)]
    [string]$PortName
)

##############################
# Functions and Variables    #
##############################
$UninstallError = $Null

function Write-Log {
    Param (
        [parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [string]$Value,
        [string]$FileName = "$($PrinterName).log",
        [switch]$Stamp
    )

    $LogFile = Join-Path -Path $Env:SystemRoot -ChildPath $("Temp\$FileName")

    If ($Stamp) {
        $LogText = "[$(Get-Date -Format "dd/MM/yyyy") $(Get-Date -Format "HH:mm:ss")] $($Value)"
    }
    Else {
        $LogText = "$($Value)"   
    }
	
    Try {
        Out-File -InputObject $LogText -Append -NoClobber -Encoding Default -FilePath $LogFile -ErrorAction Stop
    }
    Catch [System.Exception] {
        Write-Warning -Message "Unable to add log entry to $LogFile. Error message at line $($_.InvocationInfo.ScriptLineNumber): $($_.Exception.Message)"
    }
}

##############################
# Start Uninstallation       #
##############################
Write-Log -Value "##################################################"
Write-Log -Value "Uninstallation started using the following values:"
Write-Log -Value "##################################################"
Write-Log -Value "Printer Name: $PrinterName"
Write-Log -Value "Port Name: $PortName"
Write-Log -Value "##################################################"
Write-Log -Value ""

##############################
# Uninstall Printer          #
##############################
If (-not $UninstallError) {
    Try {
        $PrinterExist = Get-Printer -Name $PrinterName -ErrorAction SilentlyContinue
        If ($PrinterExist) {
            Write-Log -Stamp -Value "Removing Printer ""$($PrinterName)"""
            Remove-Printer -Name $PrinterName -Confirm:$False
        }
        Else {
            Write-Log -Stamp -Value "Printer Name ""$($PrinterName)"" does not exist. Skipping printer removal."
        }
    }
    Catch {
        Write-Warning "Error uninstalling Printer"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "Error uninstalling Printer"
        Write-Log -Stamp -Value "$($_.Exception)"
        $UninstallError = $True
    }
}

##############################
# Uninstall PrinterPort      #
##############################
If (-not $UninstallError) {
    Try {
        $PrinterPortExists = Get-Printerport -Name $PortName -ErrorAction SilentlyContinue
        If ($PrinterPortExists) {
            Write-Log -Stamp -Value "Removing Printer Port ""$($PortName)"""
            Remove-PrinterPort -Name $PortName -Confirm:$False
        }
        Else {
            Write-Log -Stamp -Value "Printer Port ""$($PortName)"" does not exist. Skipping printer port removal."
        }
    }
    Catch {
        Write-Warning "Error uninstalling Printer Port"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "Error uninstalling Printer Port"
        Write-Log -Stamp -Value "$($_.Exception)"
        $UninstallError = $True
    }
}

##############################
# Finish Uninstallation      #
##############################
If (-not $UninstallError) {
    Write-Log -Stamp -Value "Uninstallation complete."
    Write-Log -Value ""
}

If ($UninstallError) {
    Write-Error "An error occured during uninstallation. The uninstallation failed. Refer to the log for more information."
    Write-Log -Stamp -Value "Uninstallation failed."
    Write-Log -Value ""
}