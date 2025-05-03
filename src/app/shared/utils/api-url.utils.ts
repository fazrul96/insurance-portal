import {environment} from '../../../environments/environment';

export function buildApiUrl(endpoint: string, isPrivate: boolean = false): string {
  const baseUrl = environment.apiBaseUrl;
  const urlPrefix = isPrivate ? environment.apiPrivateUrl : environment.apiPublicUrl;
  return `${baseUrl}${urlPrefix}${endpoint}`;
}
