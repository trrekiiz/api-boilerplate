exports.seed = function (knex, Promise) {
  const data = [
    {
      codeRedeem: 'ERERFD'
    },
    {
      codeRedeem: '23ERFD'
    },
    {
      codeRedeem: '233RFD'
    },
    {
      codeRedeem: '2eBRFD'
    },
    {
      codeRedeem: '03E4FD'
    },
    {
      codeRedeem: '43EReD'
    },
    {
      codeRedeem: '2gERFD'
    },
    {
      codeRedeem: '23I9ND'
    }

  ];
  return knex('RedeemCodes').insert(data)
};