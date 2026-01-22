import * as fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const excelFolderPath = 'test-data' + path.sep;

export function readDataFromExcelFile(fileName, SheetNmbr){
    const fullPath = excelFolderPath + fileName;
    console.log('Reading XLSX file ${fullPath}');
    if(!fs.existsSync(fullPath)){throw new Error('Cannot find file ${fullPath}') }
    const wokbook = XLSX.readFile(fullPath);
    const dataFromSheet = XLSX.utils.sheet_to_json(wokbook.Sheets[wokbook.SheetNames[SheetNmbr]]);
    return dataFromSheet;
}