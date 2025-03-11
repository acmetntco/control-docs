window.onload = function() {
  updateVmList();
};

function changeColor(color) {
  vmlist.style.color = color;
}

async function startVm(vmrg, vmname) {
  const options = {
    method: 'POST'
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  try {
    const data = await (await fetch(`/api/startazvm?ResourceGroupName=${vmrg}&Name=${vmname}`, { ...options, signal: controller.signal })).json();
    alert("Started VM " + vmname + " in resource group " + vmrg + ".");
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("Request to start VM " + vmname + " in resource group " + vmrg + " timed out.");
    } else {
      alert("An error occurred while starting VM " + vmname + " in resource group " + vmrg + ": " + error.message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

async function stopVm(vmrg, vmname) {
  const options = {
    method: 'POST'
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  try {
    const data = await (await fetch(`/api/stopazvm?ResourceGroupName=${vmrg}&Name=${vmname}`, { ...options, signal: controller.signal })).json();
    alert("Stopped VM " + vmname + " in resource group " + vmrg + ".");
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("Request to stop VM " + vmname + " in resource group " + vmrg + " timed out.");
    } else {
      alert("An error occurred while stopping VM " + vmname + " in resource group " + vmrg + ": " + error.message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

async function getVms() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);
  try {
    const data = await (await fetch(`/api/getazurevmstatus`, { signal: controller.signal })).json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      alert("Request to get VM list timed out.");
    } else {
      alert("An error occurred while fetching VM list: " + error.message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

function showLoadingPlaceholder() {
  document.getElementById("loading-placeholder").style.display = "block";
  animateLoadingPlaceholder();
}

function hideLoadingPlaceholder() {
  document.getElementById("loading-placeholder").style.display = "none";
}

function animateLoadingPlaceholder() {
  let count = 0;
  const placeholder = document.getElementById("loading-placeholder");
  const interval = setInterval(() => {
    placeholder.textContent = "Loading" + ".".repeat(count % 6);
    count++;
    if (count > 5) {
      count = 0;
    }
  }, 1000);
  return interval;
}

function updateVmList() {
  showLoadingPlaceholder();
  getVms().then(data => {
    var tbl = document.getElementById("vmlist");
    tbl.innerHTML = ''; // Clear existing table rows
    var row = '';
    for (var r = 0; r < data.length; r++) {
      var row = document.createElement("tr");
      var cellName = document.createElement("td");
      var cellNameText = document.createTextNode(data[r].Name);
      cellName.appendChild(cellNameText);
      row.appendChild(cellName);
      var cellLoc = document.createElement("td");
      var cellLocText = document.createTextNode(data[r].Location);
      cellLoc.appendChild(cellLocText);
      row.appendChild(cellLoc);
      var cellPower = document.createElement("td");
      var cellPowerText = document.createTextNode(data[r].PowerState);
      cellPower.appendChild(cellPowerText);
      row.appendChild(cellPower);
      var cellAction = document.createElement("td");

      // Create "Stop" button only if the VM's power state is "running" or "starting"
      if (["vm running", "vm starting"].includes(data[r].PowerState.toLowerCase())) {
        var cellStopButton = document.createElement("input");
        cellStopButton.type = "button";
        cellStopButton.value = "Stop";
        cellStopButton.setAttribute("onclick", "stopVm('" + data[r].ResourceGroupName+ "', '" + data[r].Name + "')");
        cellAction.appendChild(cellStopButton);
      }

      // Create "Start" button only if the VM's power state is "stopped", "stopping", "deallocating" or "deallocated"
      if (["vm stopped", "vm stopping", "vm deallocating", "vm deallocated"].includes(data[r].PowerState.toLowerCase())) {
        var cellStartButton = document.createElement("input");
        cellStartButton.type = "button";
        cellStartButton.value = "Start";
        cellStartButton.setAttribute("onclick", "startVm('" + data[r].ResourceGroupName+ "', '" + data[r].Name + "')");
        cellAction.appendChild(cellStartButton);
      }

      row.appendChild(cellAction);
      tbl.appendChild(row);
    }
    hideLoadingPlaceholder();
  }).catch(error => {
    alert("An error occurred while updating VM list: " + error.message);
    hideLoadingPlaceholder();
  });
}

// Call updateVmList immediately and then every 30 seconds
setInterval(updateVmList, 60000);
