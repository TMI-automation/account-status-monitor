/*
  TMI - ACCOUNT STATUS MONITOR
  --------------------------------
  Last Updated: September 25, 2020
  
  Checks whether account(s) have had activity in the past hour. This is done by 
  assessing whether each account has received any impressions over the previous 
  hour.
  
  It is recommended to set this script up to run on an hourly basis. Although, 
  for smaller accounts, you may get false positives over the early hours of the 
  morning given that the number of impressions could be zero at that point 
  naturally.
  
  How To Use:
  1. Update the value for "email" to the email addess(es) you would like to send
   the notification emails to. Separate multiple email addresses using commas 
   e.g. "a@b.com, c@d.com".
  2. Add your respective account IDs to the "accounts" list separated by commas.
  This script simply emails if any account(s) have become inactive. It does not 
  make any changes to your account.
  
  If you have any issues with the set up or execution of this script, please 
  contact automation@the-media-image.com
*/

/* -------------------------------  SETTINGS -------------------------------- */
var config = {
  email: "UPDATE_WITH_YOUR_EMAIL",
  accounts: ["000-000-0000", "111-111-1111", "222-222-2222", "333-333-3333",
             "444-444-4444", "555-555-5555", "666-666-6666", "777-777-7777"]
};
/* -------------------------------------------------------------------------- */

/* ------------------------------ DO NOT TOUCH ------------------------------ */
var scriptName = "accountStatusMonitor";
eval(
  DriveApp.getFileById("1ir1q0V_ROd4gQX6mmdxI6Qp8c3QdHAlS")
    .getBlob()
    .getDataAsString()
);

/*
  Process an individual account using the script provided by the variable 
  scriptName.
  
  Returns the results yielded from processing that account.
*/
function processAccount() {
  return controller(scriptName, config, undefined);
}

/*
  Processes results provided by the execution of the processAccount function.
  
  Sends an email containing the results output if required by the script.
  Email send is placed here due to auth limitations.
*/
function processResults(results) {
  var output = controller(scriptName, config, results);
  
  if (output.toSendEmail) {
    MailApp.sendEmail({
      to: config.email,
      subject: output.subject,
      htmlBody: output.body,
    });
  }
}

/*
  Attempt to run at MCC level before resulting to account level.
*/
function main() {
  try {
    AdsManagerApp.accounts()
      .withIds(config.accounts)
      .executeInParallel("processAccount", "processResults");
  } catch (e) {
    processResults(processAccount());
  }
}
