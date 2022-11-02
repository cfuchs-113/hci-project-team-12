from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

from google.cloud import speech

# Create your views here.

@api_view(['GET', 'POST'])
def transcribe(request):

    # Instantiates a client
    client = speech.SpeechClient()

    # The name of the audio file to transcribe
    """ gcs_uri = "gs://cloud-samples-data/speech/brooklyn_bridge.raw"

    audio = speech.RecognitionAudio(uri=gcs_uri) """

    data = json.load(request)

    gcs_content = data['audioData']
    audio = speech.RecognitionAudio(content=gcs_content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.OGG_OPUS,
        sample_rate_hertz=48000,
        language_code="en-US",
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)

    print(response);

    guess = format(response.results[0].alternatives[0].transcript)

    json_response = {"guess": guess}
    return Response(json_response)