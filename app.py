import os 

import pandas as pd
import numpy as np

import sqlalchemy 
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine 

from flask import Flask, jsonify, render_template 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

Base= automap_base()
Base.prepare(db.engine, reflect=True)

Samples_Metadata = Base.classes.sample_metadata
Samples = Base.classes.samples 

