# Account Status Monitor

Checks whether account(s) have had activity in the past hour. This is done by assessing whether each account has received any impressions over the previous hour.
  
It is recommended to set this script up to run on an hourly basis. Although, for smaller accounts, you may get false positives over the early hours of the morning given that the number of impressions could be zero at that point naturally.
  
## How To Use:

1. Update the value for "email" to the email addess(es) you would like to sendthe notification emails to. Separate multiple email addresses using commas e.g. "a@b.com, c@d.com".
2. Add your respective account IDs to the "accounts" list separated by commas. This script simply emails if any account(s) have become inactive. It does not make any changes to your account.
  
*If you have any issues with the set up or execution of this script, please contact automation@the-media-image.com*
