import requests, concurrent.futures, json, pathlib, xml.etree.ElementTree as ET, urllib.parse
from bs4 import BeautifulSoup
root=pathlib.Path(__file__).parent
base='https://www.chennairents.in'
xml=requests.get(base+'/sitemap.xml',timeout=30).text
urls=[e.text for e in ET.fromstring(xml).iter() if e.tag.endswith('loc')]
urls+= [base+x for x in ['/listings/index.html','/listings/listings.html','/listings/list-property.html','/authors']]
def get(u):
 try:
  r=requests.get(u,timeout=35); s=BeautifulSoup(r.text,'html.parser')
  main=s.find('main') or s
  for el in main.select('script,style'): el.decompose()
  return dict(url=u,final=r.url,status=r.status_code,title=s.title.get_text() if s.title else '',h1=[x.get_text(' ',strip=True) for x in s.select('h1')],headings=[x.get_text(' ',strip=True) for x in main.select('h2,h3')],text=main.get_text(' ',strip=True),links=sorted(set(a.get('href','') for a in s.select('a[href]'))),css=[x.get('href') for x in s.select('link[rel=stylesheet]')])
 except Exception as e:return dict(url=u,error=str(e))
rows=json.loads((root/'pages.json').read_text(encoding='utf-8')) if (root/'pages.json').exists() else []
pending=set(urls)-{r['url'] for r in rows}
for depth in range(5):
 with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex: rows+=list(ex.map(get,sorted(pending)))
 known={r['url'].rstrip('/') for r in rows}|{r.get('final','').rstrip('/') for r in rows}
 pending=set()
 for r in rows:
  for a in r.get('links',[]):
   u=urllib.parse.urljoin(r.get('final',r['url']),a);v=urllib.parse.urlparse(u)
   if v.netloc in ['www.chennairents.in','chennairents.in'] and not v.query and not v.fragment and not any(v.path.endswith(e) for e in ['.svg','.png','.jpg','.webp','.xml','.css','.js']) and u.rstrip('/') not in known:pending.add(u)
 print('pass',depth,'pages',len(rows),'new',len(pending),flush=True)
 if not pending:break
(root/'pages.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'total':len(rows),'status':{str(x):sum(r.get('status')==x for r in rows) for x in set(r.get('status') for r in rows)},'errors':[r for r in rows if r.get('status')!=200]},ensure_ascii=False))
