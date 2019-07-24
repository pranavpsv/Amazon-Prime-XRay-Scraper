import json
import re
import csv
import os
xray_files = []
path = r'C:\Users\pranav.vadrevu\Amazon_scraper\xray_jsonfiles' # Path to directory containing all xray json files. 
for r, d, f in os.walk(path):
    for file in f:
        if '.json' in file:
            xray_files.append(os.path.join(r, file))
for xray_file in xray_files:
    movie_name = xray_file.split("_xray")[0]
    with open(xray_file) as data:
        data = json.load(data)
    try:
        scenes = data['page']['sections']['left']['widgets']['widgetList']
        scenes = scenes[0]['widgets']['widgetList'][1]['partitionedChangeList']
        with open(movie_name + '_xray.csv', 'w',newline='') as out:
            w = csv.writer(out)
            w.writerow(['nconst', 'character', 'start', 'end'])
            for s in scenes:
                start = s['timeRange']['startTime']
                end = s['timeRange']['endTime']
                for init in s['initialItemIds']:
                    rd = re.search('/name/(nm.+)/(.+)', init)
                    if rd is not None:
                        w.writerow([rd.group(1), rd.group(2), start, end])
                for item in s['changesCollection']:
                    rd = re.search('/name/(nm.+)/(.+)', item['itemId'])
                    if rd is not None:
                        iStart = item['timePosition']
                        w.writerow([rd.group(1), rd.group(2), iStart, end])
    except:
        continue