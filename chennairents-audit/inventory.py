import json, pathlib, html, urllib.parse
root=pathlib.Path(__file__).parent
rows=json.loads((root/'pages.json').read_text(encoding='utf8'))
visual={'/':'Desktop and 390px mobile','/listings':'Desktop map','/listings/index.html':'Shared map destination','/listings/listings.html':'Desktop and 390px mobile','/listings/list-property.html':'Desktop stages 1 and 2','/chennai/velachery':'Desktop full page','/chennai/rentals':'Desktop','/house-rent-in-chennai':'Desktop','/guides/advance-deposit-chennai':'Desktop first viewport','/privacy':'390px mobile'}
def classify(r):
 p=urllib.parse.urlparse(r['url']).path.strip('/');bits=p.split('/')
 if r.get('status')!=200:return 'Broken destination','Repair source link or add a verified redirect; do not fabricate destination content.'
 if p=='':return 'Homepage','Prioritize discovery and comparisons; reduce repetition; normalize card metadata and action alignment.'
 if p.startswith('listings'):
  if 'list-property' in p:return 'Property form','Fix five-stage/four-step discrepancy; align labels, fields, errors and actions; test conditional states.'
  if 'listings.html' in p:return 'Listings feed','Fix verified 390px overflow; responsive card grid, consistent facts, aligned actions and contained filters.'
  return 'Map','Group search/filter, transaction, contributions and utilities; preserve map visibility and attribution.'
 if bits[0]=='chennai':
  if len(bits)>2:return 'Locality category','Lead with selected category and relevant rent/facts; compact cross-navigation; preserve unique content. Template-level recommendation, not individual visual verification.'
  if bits[-1] in ['rentals','1-bhk-for-rent','2-bhk-for-rent','3-bhk-for-rent','pg']:return 'Directory hub','Move browsing controls up; normalize card spacing, labels and geographic grouping.'
  return 'Locality profile','Move rent/facts and browsing actions up; use readable prose width and compact related-link groups.'
 if bits[0] in ['guides','stories']:return 'Guide / story','Compact hero; consistent byline/date/read-time, readable column, contents links and restrained callouts.'
 if p in ['about','methodology','verification','corrections','contact','privacy','data-deletion','authors'] or bits[0]=='author':return 'Trust / support / team','Consistent readable sections; page-specific contact, steps, log or form structure; resolve editorial contradictions.'
 return 'Citywide / alias landing','Prioritize route-specific BHK/budget/audience; retain internal links and SEO; compact repeated hero.'
out=[]
for r in rows:
 path=urllib.parse.urlparse(r['url']).path;group,note=classify(r);v=visual.get(path,'Structural/content check only')
 if path=='/chennai/velachery/flats-for-rent-in-velachery':v='Visual attempts timed out; HTTP content checked'
 vals=[f'<a href="{html.escape(r["url"])}">{html.escape(path or "/")}</a>',str(r.get('status','Error')),html.escape(r.get('final','')),html.escape(group),html.escape(' | '.join(r.get('h1',[]))),html.escape(v),html.escape(note)]
 out.append('<tr>'+''.join('<td>'+x+'</td>' for x in vals)+'</tr>')
page='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chennai Rents — Full URL Audit</title><style>body{font:16px/1.5 system-ui;margin:32px;background:#faf7f2;color:#1e1b18}h1{margin-bottom:8px}input{padding:12px;width:min(90%,700px);margin:16px 0;border:1px solid #aaa;border-radius:8px}table{border-collapse:collapse;width:100%;background:white}th,td{padding:12px;text-align:left;vertical-align:top;border:1px solid #ddd;font-size:13px;overflow-wrap:anywhere}th{background:#eee5d8;position:sticky;top:0}a{color:#9b3026}.wrap{overflow:auto}td:nth-child(1){min-width:210px}td:nth-child(7){min-width:260px}</style><h1>Chennai Rents: full discovered-URL audit</h1><p>5 October 2026 · 523 URLs checked · 494 HTTP 200 after redirects · 29 HTTP 404 · 465 distinct successful final URL strings.</p><p>Every row received a structural/content check. Visual inspection was sampled and is labeled. Recommendations inherited from a shared template are not individually verified visual defects. Aliases are included; URL counts are not unique-content counts.</p><label for="q">Filter by route, status, family or recommendation</label><br><input id="q" placeholder="Try: 404, mobile, velachery, form"><p id="count">523 results</p><div class="wrap"><table><thead><tr><th>Requested route</th><th>Status</th><th>Final URL</th><th>Family</th><th>H1</th><th>Visual coverage</th><th>Recommendation</th></tr></thead><tbody>'''+''.join(out)+'''</tbody></table></div><script>const q=document.querySelector('#q'),rs=[...document.querySelectorAll('tbody tr')];q.addEventListener('input',()=>{let n=0;rs.forEach(r=>{let ok=r.textContent.toLowerCase().includes(q.value.toLowerCase());r.hidden=!ok;if(ok)n++});document.querySelector('#count').textContent=n+' results'});</script></html>'''
(root/'page-inventory.html').write_text(page,encoding='utf8')
print('Wrote inventory:',len(rows),'rows')
