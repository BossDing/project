<?php
   $requestXmlBody = '<?xml version="1.0" encoding="utf-8"?> 
<getUserCasesRequest xmlns="http://www.ebay.com/marketplace/resolution/v1/services"> 
  <RequesterCredentials> 
    <eBayAuthToken>'.$userToken.'</eBayAuthToken> 
  </RequesterCredentials>
  <creationDateRangeFilter>
  <fromDate>'.$data[start].'</fromDate>
  <toDate>'.$data[end].'</toDate>
  </creationDateRangeFilter>
  <caseTypeFilter>
  <caseType>EBP_INR</caseType>
  <caseType>CANCEL_TRANSACTION</caseType>
  <caseType>EBP_SNAD</caseType>
  <caseType>INR</caseType>
  <caseType>PAYPAL_INR</caseType>
  <caseType>PAYPAL_SNAD</caseType>
  <caseType>RETURN</caseType>
  <caseType>SNAD</caseType>
  </caseTypeFilter>
  <caseStatusFilter>
    <caseStatus>CLOSED</caseStatus>
    <caseStatus>OPEN</caseStatus>
  </caseStatusFilter>
  <Pagination>
      <EntriesPerPage>200</EntriesPerPage>
      <PageNumber>'.$page.'</PageNumber>
  </Pagination>
  <sortOrder>CREATION_DATE_DESCENDING</sortOrder>
</getUserCasesRequest>';
?>