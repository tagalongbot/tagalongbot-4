let { RUNNERS_BASE_ID } = process.env;

let turf = require('turf');
let turf_circle = require('@turf/circle').default;
let turf_boolean_within = require('@turf/boolean-within').default;
let zipcodes = require('zipcodes');

let { getTable, getAllDataFromTable, findTableData, updateTableData, createTableData } = require('../../libs/data.js');

let getDataTable = getTable('Runners');
let dataTable = getDataTable(RUNNERS_BASE_ID);
let getData = getAllDataFromTable(dataTable);
let createData = createTableData(dataTable);
let findData = findTableData(dataTable);
let updateDataFromTable = updateTableData(dataTable);

let getAllRunners = async ({ filterByFormula = '', view = 'Main View' } = {}) => {
  let runners = await getData({ filterByFormula, view });
  return runners;
}

let getRunnerByMessengerID = async (messenger_user_id) => {
  let filterByFormula = `{messenger user id} = '${messenger_user_id}'`;
  let [runner] = await getData({ filterByFormula,  });
  return runner;
}

let getRunnerByID = async (runner_id) => {
  let runner = await findData(runner_id);
  return runner;
}

let createRunner = async (new_runner_data) => {
  let new_runner = await createData(new_runner_data);
  return new_runner;
}

let updateRunner = async (update_data, runner) => {
  let updated_runner = updateDataFromTable(update_data, runner);
  return updated_runner;
}

let searchNearbyRunnersByCoordinates = async ({ latitude, longitude }) => {
  let filterByFormula = `{Active?}`;
  let all_runners = await getAllRunners({ filterByFormula });

  let center = [Number(latitude), Number(longitude)];
  let radius = 10;
  let options = { units: 'miles' };
  let circle = turf_circle(center, radius, options);

  let runners = all_runners.filter(runner => {
    let runner_latitude = runner.fields['Latitude'];
    let runner_longitude = runner.fields['Longitude'];

    let runner_location_point = turf.point([runner_latitude, runner_longitude]);

    let isWithinCircle = turf_boolean_within(runner_location_point, circle);
    return isWithinCircle;
  });

  return runners;
}

let searchNearbyRunnersByZipCode = async ({ zip_code }) => {
  let findRunnersByZipCode = runner =>
    runner.fields['Zip Code'] === zip_code.trim();

  let filterByFormula = `{Active?}`;
  let all_runners = await getAllRunners({ filterByFormula });

  let runners = [];
  let zip_codes_index = 0;
  let used_zip_codes = [];

  let nearby_zip_codes = zipcodes.radius(
    zip_code,
    Number(10)
  );

  do {
    runners = all_runners.filter(findRunnersByZipCode);

    used_zip_codes.push(zip_code);

    if (!runners[0]) {
      zip_code = nearby_zip_codes[zip_codes_index];
      if (!zip_code) break;
      zip_codes_index = zip_codes_index + 1;
    }
  } while(!runners[0]);

  while (runners.length < 3) {
    if (zip_codes_index === 0) zip_codes_index = zip_codes_index + 1;

    zip_code = nearby_zip_codes[zip_codes_index];
    used_zip_codes.push(zip_code);

    if (!zip_code || used_zip_codes.includes(zip_code)) break;

    let more_practices = all_runners.filter(findRunnersByZipCode);
    zip_codes_index = zip_codes_index + 1;

    runners = [...runners, ...more_practices];
  }

  return runners;
}

module.exports = {
  getAllRunners,
  getRunnerByMessengerID,
  getRunnerByID,
  createRunner,
  updateRunner,
  searchNearbyRunnersByCoordinates,
  searchNearbyRunnersByZipCode,
}