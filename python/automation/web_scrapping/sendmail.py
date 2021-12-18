import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import datetime

SERVER = "smpt.gmail.com"
PORT=587
FROM=''
TO=''
USER = ''
PASS = ''


def sendMail(**kwargs):
    msg = MIMEMultipart()
    msg['Subject'] = kwargs.get('subject')
    msg['From'] = kwargs.get('from')
    msg['To']= kwargs.get('to')
    msg.attach(MIMEText(kwargs.get('content'), 'html'))
    print('Initiating Server...')
    server = smtplib.SMTP(SERVER, PORT)
    server.set_debuglevel(1)
    server.ehlo()
    server.starttls()
    server.login(FROM, PASS)
    server.sendmail(FROM, TO, msg.as_string())
    print('Email Sent...')
    server.quit()


