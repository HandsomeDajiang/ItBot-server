// import request from '@/utils/request';
import request from 'umi-request';
export async function getVerificationDetail(optId: string, token: string) {
  return request(
    'https://itbot.test.difft.org/v1/operation/verifydevice/' + optId,
    {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    },
  );
}
