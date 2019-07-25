        var spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
            "description": "A simple bar chart with ranged data (aka Gantt Chart).",
            "width": 900,
            "height": 600,
            "data": {"url": "/movie"},
            "mark": "bar",
            "encoding": {
              "y": {"field": "character", "type": "ordinal"},
              "x": {"field": "start (min)", "type": "quantitative"},
              "x2": {"field": "end (min)"},
              "color": {"field": "character", "type": "nominal", "legend": false}
            }
            
          }