"""
A scraper to get the list of languages supported by prismjs
Site: https://lucidar.me/en/web-dev/list-of-supported-languages-by-prism/

DOM Tree:
    table
        tbody
            tr
                td: language
                td: key
                td: class
"""
import requests
from bs4 import BeautifulSoup
import pyperclip
import json

url = 'https://lucidar.me/en/web-dev/list-of-supported-languages-by-prism/'
response = requests.get(url)

is_success = response.status_code == 200
if not is_success:
    print("Request failed.")
else:
    soup = BeautifulSoup(response.text, 'html.parser')

    table = soup.find("tbody")
    table_not_found = table == None
    if table_not_found:
        print("Table element not found. Where did it go?")
    else:
        rows = table.find_all("tr") # type: ignore
        
        supported_languages = []
        for row in rows:
            cells = row.find_all("td")

            row_data = [cell.get_text(strip=True) for cell in cells]
            language, key, className = row_data

            supported_languages.append({
                'label': language,
                'key': key,
            })
        print(supported_languages)
        pyperclip.copy(json.dumps(supported_languages))
        
