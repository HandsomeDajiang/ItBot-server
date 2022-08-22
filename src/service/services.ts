import request from '@/utils/request';

export async function getVerificationDetail(data = {}, token: string) {
  return request('https://*/v1/operation/verifydevice', {
    method: 'GET',
    params: data,
    headers: { Authorization: token },
  });
}
