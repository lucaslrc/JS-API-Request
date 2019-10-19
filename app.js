var icaoListPR = [ 
  'SBMG',
  'SBLO',
  'SBCT',
  'SBCA',
  'SBFI',
  'SBPG',
]

var icaoListSP = [
  'SBGR',
  'SBSP',
  'SBKP',
  'SBMT',
  'SBSJ',
  'SBSR'
]

var icaoListRJ = [
  'SBGL',
  'SBRJ'
]

var icaoListSC = [
  'SBFL'
]

function searchForICAO() {
    let icao = window.document.getElementById('icao').value;
    let local = String(icao)
    if(local == '') {
      document.getElementById('demo').innerText = 'Campo vazio, por favor preencha o campo acima.'
    } else {
      var xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById('demo').innerText = this.responseText
        }
      }
      xhttp.open("GET", `http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${local}&msg=metar`, true);
      xhttp.send()
    }
}

function searchForState() {
    let state = document.getElementById('states').value
    let result = document.getElementById('resultState')

    switch(state) {
      case "PR":
        result.innerHTML = `Estado selecionado: Paraná.
        <br>
        <br>
        ${icaoListPR.length} aeroportos encontrados: ${icaoListPR.join(' - ')}`
        localizeStateICAO(icaoListPR)
      break

      case "SP":
        result.innerHTML = `Estado selecionado: São Paulo.
        <br>
        <br>
        ${icaoListSP.length} aeroportos encontrados: ${icaoListSP.join(' - ')}`
        localizeStateICAO(icaoListSP)
      break

      case "RJ":
        result.innerHTML = `Estado selecionado: Rio de Janeiro.
        <br>
        <br>
        ${icaoListRJ.length} aeroportos encontrados: ${icaoListRJ.join(' - ')}`
        localizeStateICAO(icaoListRJ)
      break

      case "SC":
        result.innerHTML = `Estado selecionado: Santa Catarina.
        <br>
        <br>
        Aeroportos: ${icaoListSC.join(' - ')}`
        localizeStateICAO(icaoListSC)
      break
    }
}

function localizeStateICAO(icaoCode) {
  let local = icaoCode
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('icaoState').innerText = this.responseText
    }
  }
  xhttp.open("GET", `http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${local}&msg=metar`, true)
  xhttp.send()
}

function advancedSearch() {
  let icao = document.getElementById('advancedSearchIcaoBar').value
  let datetime = document.getElementById('advancedSearchDate').value
  let time = document.getElementById('advancedSearchHour').value

  //String's converts
  let stringIcao = String(icao)
  let stringDateTime = String(datetime)
  let stringTime = String(time)

  if(stringIcao == '' || stringDateTime == '' || stringTime == '') {
    document.getElementById('advancedResult').innerText = 'Dados incompletos, por favor preencha todos os campos.'
  } else {
    //Using slice() for ajust date and hour
    let YY = stringDateTime.slice(0, 4)
    let MM = stringDateTime.slice(5, 7)
    let DD = stringDateTime.slice(8, 10)
    let HH = stringTime

    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('advancedResult').innerText = this.responseText
        console.log(`Busca feita: ${stringIcao}, ${stringDateTime}, ${stringTime}`)
      }
    }
    xhttp.open("GET", `http://www.redemet.aer.mil.br/api/consulta_automatica/index.php?local=${stringIcao}&msg=metar&
    data_ini=${YY}${MM}${DD}${HH}&data_fim=${YY}${MM}${DD}${HH}`, true)
    xhttp.send()
  }
}