var myTableArray = []
$('body').on('click', '#solve', function (e) {
  $('table#objectsTable tr').each(function () {
    var arrayOfThisRow = []
    var tableData = $(this).find('td input')
    if (tableData.length > 0) {
      tableData.each(function () {
        arrayOfThisRow.push($(this).val())
      })
      myTableArray.push(arrayOfThisRow)
    }
  })
  var W = parseInt($('#W').val())
  var n = parseInt($('#N').val())
  var z = []
  var arrayOfThisZRow = []
  for (i = 0; i <= n; i++) {
    arrayOfThisZRow = []
    for (j = 0; j <= W; j++) {
      arrayOfThisZRow.push(0)
    }
    z.push(arrayOfThisZRow)
  }
  for (i = 1; i <= n; i++) {
    for (v = 0; v <= W; v++) {
      if (v < parseInt(myTableArray[i - 1][1])) {
        z[i][v] = z[i - 1][v]
      } else {
        var s = parseInt(myTableArray[i - 1][1])
        var d = z[i - 1][v]
        var t = z[i - 1][v - s] + parseInt(myTableArray[i - 1][2])
        z[i][v] = Math.max(d, t)
      }
    }
  }
  console.log(z)
  var v = W
  var i = n
  var objects = []
  while (v != 0 && i != 0) {
    if (z[i - 1][v] > z[i][v]) {
      i--
    } else {
      objects.push(myTableArray[i - 1][0])
      var thisW = parseInt(myTableArray[i - 1][1])
      i--
      v -= thisW
    }
  }
  console.log(objects)
  window.result.innerHTML =
    '<label>Total weight = ' +
    z[n][W] +
    '</label><label>The objects are : ' +
    objects +
    '</label>'
})

$('#generate').click(function () {
  var n = $('#N').val()
  window.objectsTable.innerHTML =
    '<tr><th>Objects</th><th>Wi</th><th>Ci</th></tr>'
  for (i = 1; i <= n; i++) {
    window.objectsTable.innerHTML =
      window.objectsTable.innerHTML +
      '<tr><td><input class="form-control" style="width: 100%;"  value="' +
      i +
      '" />' +
      '</td><td><input class="form-control" style="width: 100%;"  value="' +
      i +
      '" type="number"/>' +
      '</td><td><input class="form-control" style="width: 100%;"  value="' +
      i +
      '" type="number"/>' +
      '</td></tr>'
  }
})
