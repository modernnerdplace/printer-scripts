##################################################
#                   PRINTER NAME                 #
#                Install v2022.4.4               #
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
    [string]$PrinterHostAddress,
    [string]$PortName = "IP_$($PrinterHostAddress)",
    [Parameter(Mandatory = $True)]
    [string]$DriverName, #DRIVERNAME - IF KNOWN SPECIFY AND REMOVE LINE 18
    [string]$InfFile = "" #INFFILE
)

##############################
# Functions and Variables    #
##############################
$InstallError = $Null

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
# Start Installation         #
##############################
Write-Log -Value "################################################"
Write-Log -Value "Installation started using the following values:"
Write-Log -Value "################################################"
Write-Log -Value "Printer Name: $PrinterName"
Write-Log -Value "Printer Host Address: $PrinterHostAddress"
Write-Log -Value "Port Name: $PortName"
Write-Log -Value "Driver Name: $DriverName"
Write-Log -Value "INF File: $INFFile"
Write-Log -Value "################################################"
Write-Log -Value ""

##############################
# Staging Drivers            #
##############################
If (-not $InstallError) {
    Try {
        Write-Log -Stamp -Value "Staging Driver to Windows Driver Store using ""$($INFFile)"""
        Write-Log -Stamp -Value "Running Command: ""Start-Process $Env:WinDir\SysNative\pnputil.exe -ArgumentList /add-driver Drivers\$($INFFILE) -Wait -PassThru"""
        Start-Process $Env:WinDir\SysNative\pnputil.exe -ArgumentList "/add-driver Drivers\$($INFFILE)" -Wait -PassThru
    }
    Catch {
        Write-Warning "An error occured while staging driver to Windows Driver Store"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "An error occured while staging driver to Windows Driver Store"
        Write-Log -Stamp -Value "$($_.Exception)"
        $InstallError = $True
    }
}

##############################
# Install PrinterDriver      #
##############################
If (-not $InstallError) {
    Try {
        $PrinterDriverExist = Get-PrinterDriver -Name $DriverName -ErrorAction SilentlyContinue
        If (-not $PrinterDriverExist) {
            Write-Log -Stamp -Value "Installing Printer Driver ""$($DriverName)"""
            Add-PrinterDriver -Name $DriverName -Confirm:$False
        }
        Else {
            Write-Log -Stamp -Value "Printer Driver ""$($DriverName)"" already exists. Skipping driver installation."
        }
    }
    Catch {
        Write-Warning "Error installing Printer Driver"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "Error installing Printer Driver"
        Write-Log -Stamp -Value "$($_.Exception)"
        $InstallError = $True
    }
}

##############################
# Install PrinterPort        #
##############################
If (-not $InstallError) {
    Try {
        $PrinterPortExists = Get-Printerport -Name $PortName -ErrorAction SilentlyContinue
        If (-not $PrinterPortExists) {
            Write-Log -Stamp -Value "Adding Printer Port ""$($PortName)"""
            Add-PrinterPort -name $PortName -PrinterHostAddress $PrinterHostAddress -Confirm:$False
        }
        Else {
            Write-Log -Stamp -Value "Printer Port ""$($PortName)"" already exists. Skipping port installation."
        }
    }
    Catch {
        Write-Warning "Error installing Printer Port"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "Error installing Printer Port"
        Write-Log -Stamp -Value "$($_.Exception)"
        $InstallError = $True
    }
}

##############################
# Install Printer            #
##############################
If (-not $InstallError) {
    Try {
        $PrinterExist = Get-Printer -Name $PrinterName -ErrorAction SilentlyContinue
        If (-not $PrinterExist) {
            Write-Log -Stamp -Value "Adding Printer ""$($PrinterName)"""
            Add-Printer -Name $PrinterName -DriverName $DriverName -PortName $PortName -Confirm:$False
        }
        Else {
            Write-Log -Stamp -Value "Printer Name ""$($PrinterName)"" already exists. Removing old printer..."
            Remove-Printer -Name $PrinterName -Confirm:$False
            Write-Log -Stamp -Value "Adding Printer ""$($PrinterName)"""
            Add-Printer -Name $PrinterName -DriverName $DriverName -PortName $PortName -Confirm:$False
        }
    }
    Catch {
        Write-Warning "Error installing Printer"
        Write-Warning "$($_.Exception.Message)"
        Write-Log -Stamp -Value "Error installing Printer"
        Write-Log -Stamp -Value "$($_.Exception)"
        $InstallError = $True
    }
}

##############################
# Finish Installation        #
##############################
If (-not $InstallError) {
    Write-Log -Stamp -Value "Installation complete."
    Write-Log -Value ""
}

If ($InstallError) {
    Write-Error "An error occured during installation. The installation failed. Refer to the log for more information."
    Write-Log -Stamp -Value "Installation failed."
    Write-Log -Value ""
}