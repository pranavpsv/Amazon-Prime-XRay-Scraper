import json
import re
import csv
import os
xray_files = []
movie_names = []
ms_in_min = 1.6667e-5
path = r'C:\Users\pranav.vadrevu\Amazon_scraper\telugujson' # Path to directory containing all xray json files. 
for r, d, f in os.walk(path):
    for file in f:
        if '.json' in file:
            xray_files.append(os.path.join(r, file))
for xray_file in xray_files:
    movie_names.append(xray_file.split('\\')[-1].split(".json")[0])
    movie_name = xray_file.split("_xray")[0]
    with open(xray_file) as data:
        try:
            data = json.load(data)
            scenes = data['page']['sections']['left']['widgets']['widgetList']
            scenes = scenes[0]['widgets']['widgetList'][1]['partitionedChangeList']
            with open(movie_name + '_xray.csv', 'w',newline='') as out:
                w = csv.writer(out)
                w.writerow(['nconst', 'character', 'start (min)', 'end (min)', "duration"])
                for s in scenes:
                    start = s['timeRange']['startTime'] * ms_in_min
                    end = s['timeRange']['endTime'] * ms_in_min
                    duration = end-start
                    for init in s['initialItemIds']:
                        rd = re.search('/name/(nm.+)/(.+)', init)
                        if rd is not None:
                            w.writerow([rd.group(1), rd.group(2), start, end, duration])
                    for item in s['changesCollection']:
                        rd = re.search('/name/(nm.+)/(.+)', item['itemId'])
                        if rd is not None:
                            iStart = item['timePosition'] * ms_in_min
                            duration = end - iStart
                            w.writerow([rd.group(1), rd.group(2), iStart, end, duration])
        except:
            continue

print(movie_names)