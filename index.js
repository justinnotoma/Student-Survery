const xlsx = require('xlsx')
const express = require('express')

// Creating a sever
const app = express()
app.listen(3000, e=> console.log('listening at port 3000'))
app.use(express.static('public'))

// Get xlsx file
const workbook = xlsx.readFile('Student most like classes.xlsx')
const worksheets = {}

// fill out "worksheets"
for(const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
}

// Post to excel
app.use(express.json({ limit: '1mb' }))
app.post('/pushXlsx', (req, res) => {
    console.log('I got a request')
    let data = req.body
    console.log(data)

    // Modify XLSX
    worksheets['Sheet1'].push({
        'Student Name': data['name'],
        'Math': data['math'],
        'Science': data['science'],
        'History': data['history'],
        'ELA': data['ela']
    })

    // update xlsx file
    xlsx.utils.sheet_add_json(workbook.Sheets['Sheet1'], worksheets['Sheet1'])
    xlsx.writeFile(workbook, "Student most like classes.xlsx")
})

