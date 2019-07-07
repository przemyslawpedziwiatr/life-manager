import express = require("express");

// tslint:disable-next-line:no-namespace
declare  namespace Express {
    export interface RequestWithFiles extends express.Request{
        files?: Array<Object>
    }
}
