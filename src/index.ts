'use strict'

/* eslint-disable */
import { Response } from 'express'
interface JsonRes {
  code: number,
  type: string,
  message?: string,
  data?: object,
  error?: boolean
}

class Reply {
  public static send (res: Response, code: number, data: object): void // eslint-disable-line 
  public static send (res: Response, code: number, message: string, data: object): void// eslint-disable-line
  public static send (res: Response, code: number, message: string | object, data?: object): void {// eslint-disable-line
    let jsonRes: JsonRes
    let type: string = this.setInfo(code)

    jsonRes = {
      code,
      type
    }

    // @ts-ignore
    if (type !== 'informational' || type !== 'success') {
      jsonRes.error = true
    }

    if (typeof message === 'string') jsonRes.message = message
    if (typeof message === 'object') jsonRes.data = message
    if (data) jsonRes.data = data

    res.status(code).json(jsonRes)
  }

  static setInfo (code: number): string {
    const first: number = Number(String(code).charAt(0))
    switch (first) {
      case 1:
        return 'informational'
      case 2:
          return 'success'
      case 3:
        return 'redirection'
      case 4:
          return 'client error'
      case 5:
        return 'server error'
      default:
        return 'unknow error'
    }
  }
}

export default Reply
/* eslint-enable */
