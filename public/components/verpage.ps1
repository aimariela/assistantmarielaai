# Script PowerShell para abrir archivos HTML en Firefox
# Interfaz gráfica con tema oscuro y texto azul fosforescente

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Configuración de Firefox
$firefoxPath = "C:\Program Files\Mozilla Firefox/firefox.exe"

# Crear la ventana principal
$form = New-Object System.Windows.Forms.Form
$form.Text = "Selector de archivos HTML"
$form.Size = New-Object System.Drawing.Size(700, 500)
$form.StartPosition = "CenterScreen"
$form.BackColor = [System.Drawing.Color]::FromArgb(30, 30, 30)  # Fondo oscuro

# Etiqueta para instrucciones
$label = New-Object System.Windows.Forms.Label
$label.Location = New-Object System.Drawing.Point(20, 20)
$label.Size = New-Object System.Drawing.Size(660, 30)
$label.Text = "Selecciona los archivos HTML que deseas abrir en Firefox:"
$label.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)  # Azul fosforescente
$label.Font = New-Object System.Drawing.Font("Arial", 12, [System.Drawing.FontStyle]::Bold)
$form.Controls.Add($label)

# Panel con scroll para los checkboxes
$panel = New-Object System.Windows.Forms.Panel
$panel.Location = New-Object System.Drawing.Point(20, 60)
$panel.Size = New-Object System.Drawing.Size(660, 340)
$panel.AutoScroll = $true
$panel.BackColor = [System.Drawing.Color]::FromArgb(45, 45, 45)  # Gris oscuro
$form.Controls.Add($panel)

# Buscar archivos HTML en el directorio actual
$htmlFiles = Get-ChildItem -Path $PWD -Filter "*.html" | Select-Object -ExpandProperty FullName

# Si no hay archivos HTML, mostrar mensaje
if ($htmlFiles.Count -eq 0) {
    $noFilesLabel = New-Object System.Windows.Forms.Label
    $noFilesLabel.Location = New-Object System.Drawing.Point(20, 20)
    $noFilesLabel.Size = New-Object System.Drawing.Size(620, 60)
    $noFilesLabel.Text = "No se encontraron archivos HTML en el directorio actual."
    $noFilesLabel.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)
    $panel.Controls.Add($noFilesLabel)
} else {
    # Crear checkboxes para cada archivo HTML
    $checkboxes = @()
    $yPos = 20

    foreach ($file in $htmlFiles) {
        $checkbox = New-Object System.Windows.Forms.CheckBox
        $checkbox.Location = New-Object System.Drawing.Point(20, $yPos)
        $checkbox.Size = New-Object System.Drawing.Size(620, 30)
        $checkbox.Text = [System.IO.Path]::GetFileName($file)
        $checkbox.Tag = $file  # Guardar la ruta completa en la propiedad Tag
        $checkbox.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)  # Azul fosforescente
        $checkbox.Font = New-Object System.Drawing.Font("Arial", 10)
        $panel.Controls.Add($checkbox)
        $checkboxes += $checkbox
        $yPos += 35
    }
}

# Botón para abrir los archivos seleccionados
$button = New-Object System.Windows.Forms.Button
$button.Location = New-Object System.Drawing.Point(20, 410)
$button.Size = New-Object System.Drawing.Size(200, 40)
$button.Text = "Abrir en Firefox"
$button.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 100)
$button.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)  # Azul fosforescente
$button.Font = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
$button.Add_Click({
    $selectedFiles = $checkboxes | Where-Object { $_.Checked } | Select-Object -ExpandProperty Tag
    
    if ($selectedFiles.Count -eq 0) {
        [System.Windows.Forms.MessageBox]::Show("No has seleccionado ningún archivo.", "Error", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Warning)
        return
    }
    
    foreach ($file in $selectedFiles) {
        Start-Process -FilePath $firefoxPath -ArgumentList $file
    }
})
$form.Controls.Add($button)

# Botón para seleccionar todos
$selectAllButton = New-Object System.Windows.Forms.Button
$selectAllButton.Location = New-Object System.Drawing.Point(240, 410)
$selectAllButton.Size = New-Object System.Drawing.Size(200, 40)
$selectAllButton.Text = "Seleccionar todos"
$selectAllButton.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 100)
$selectAllButton.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)  # Azul fosforescente
$selectAllButton.Font = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
$selectAllButton.Add_Click({
    foreach ($checkbox in $checkboxes) {
        $checkbox.Checked = $true
    }
})
$form.Controls.Add($selectAllButton)

# Botón para deseleccionar todos
$deselectAllButton = New-Object System.Windows.Forms.Button
$deselectAllButton.Location = New-Object System.Drawing.Point(460, 410)
$deselectAllButton.Size = New-Object System.Drawing.Size(200, 40)
$deselectAllButton.Text = "Deseleccionar todos"
$deselectAllButton.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 100)
$deselectAllButton.ForeColor = [System.Drawing.Color]::FromArgb(0, 200, 255)  # Azul fosforescente
$deselectAllButton.Font = New-Object System.Drawing.Font("Arial", 10, [System.Drawing.FontStyle]::Bold)
$deselectAllButton.Add_Click({
    foreach ($checkbox in $checkboxes) {
        $checkbox.Checked = $false
    }
})
$form.Controls.Add($deselectAllButton)

# Mostrar el formulario
$form.ShowDialog()