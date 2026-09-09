export const buildLogsData = [
  {
    id: "LOG-84",
    title: "Idempotent Webhook Processing for Loop Pay",
    date: "2026-08-08",
    timestamp: "19:42 IST",
    category: "#golang",
    tags: ["#golang", "#upi", "#security", "#loop-pay"],
    ventureId: "loop-pay",
    status: "[IN_TESTING]",
    summary: "Faced duplicate payment webhook events during simulated network jitter. Implemented Redis SETNX atomic locks with SHA-256 event signatures to ensure payment state is mutated exactly once.",
    takeaway: "Never trust a client-side payment confirmation screen. The server must be the single source of truth for payment state reconciliation.",
    snippetLanguage: "go",
    codeSnippet: `// ProcessWebhook ensures idempotent payment state handling
func (s *PaymentService) ProcessWebhook(ctx context.Context, payload []byte, signature string) error {
    eventID := calculateSHA256(payload)
    
    // Acquire atomic Redis lock with 60s expiration
    acquired, err := s.redis.SetNX(ctx, "lock:event:"+eventID, "1", 60*time.Second).Result()
    if err != nil || !acquired {
        return ErrDuplicateEvent // Ignore duplicate webhook delivery safely
    }
    
    // Decrypt and process payment in PostgreSQL transaction
    return s.db.ExecTx(ctx, func(tx *pgx.Tx) error {
        return s.updatePaymentStatus(tx, payload)
    })
}`
  },
  {
    id: "LOG-81",
    title: "Hardware Enclave Binding for Loop ID on Mobile Devices",
    date: "2026-08-05",
    timestamp: "14:15 IST",
    category: "#security",
    tags: ["#flutter", "#security", "#loop-id", "#cryptography"],
    ventureId: "loop-id",
    status: "[SHIPPED_V1]",
    summary: "Replaced raw JWT stored in shared preferences with hardware-backed key pairs generated in iOS Secure Enclave / Android Keystore. Sensitive authentication signatures are signed inside hardware.",
    takeaway: "Assuming local storage is hostile saves you from security headaches later. If root or physical access occurs, the private key remains inaccessible.",
    snippetLanguage: "dart",
    codeSnippet: `// Flutter Hardware-backed Key Generation
final BiometricStorageFile storage = await BiometricStorage().getStorage(
  'loop_id_key',
  options: StorageFileInitOptions(
    authenticationRequired: true,
    androidBiometricOnly: true,
  ),
);
await storage.write(signedHardwareCertificate);`
  },
  {
    id: "LOG-76",
    title: "Pitch Deck Iteration: Pitching to Campus Founders vs Investors",
    date: "2026-08-01",
    timestamp: "21:10 IST",
    category: "#fundraising",
    tags: ["#pitch-deck", "#unfounded", "#fundraising", "#strategy"],
    ventureId: "campus-loop",
    status: "[VALIDATED]",
    summary: "Rebuilt the Campus Loop pitch deck after 12 founder feedback sessions. Cut 4 slides of generic market metrics; replaced with direct operational data: student retention, 12ms API speed, and zero university IT setup required.",
    takeaway: "Early-stage investors in venture studio projects don't buy big TAM promises—they buy working proof of execution velocity.",
    snippetLanguage: "markdown",
    codeSnippet: `## Slide 03: The Legacy Problem
- Current ERP average load time: 14.2 seconds
- Campus Loop average load time: 0.012 seconds
- Daily active engagement: 74% of pilot campus`
  },
  {
    id: "LOG-71",
    title: "Sub-10ms Timetable Caching in Campus Loop with Redis",
    date: "2026-07-27",
    timestamp: "11:30 IST",
    category: "#architecture",
    tags: ["#golang", "#redis", "#campus-loop", "#performance"],
    ventureId: "campus-loop",
    status: "[SHIPPED_V1]",
    summary: "Scraped legacy ERP HTML structures into clean JSON records, cached in Redis with 24-hour invalidation keys. Reduced backend load from 800 queries/min on legacy servers to 0.",
    takeaway: "Abstracting terrible legacy systems behind a fast caching proxy is 10x faster than trying to convince an enterprise vendor to upgrade their database.",
    snippetLanguage: "go",
    codeSnippet: `// FetchCachedSchedule retrieves student timetable with fallback to DB
func (c *ScheduleCache) GetStudentSchedule(ctx context.Context, studentID string) ([]ScheduleItem, error) {
    val, err := c.rdb.Get(ctx, "sched:"+studentID).Result()
    if err == nil {
        var items []ScheduleItem
        json.Unmarshal([]byte(val), &items)
        return items, nil
    }
    return c.fetchAndCacheFromSource(ctx, studentID)
}`
  },
  {
    id: "LOG-65",
    title: "First 30 Student Interviews for Loop Shop Marketplace",
    date: "2026-07-20",
    timestamp: "17:45 IST",
    category: "#user-validation",
    tags: ["#user-interviews", "#validation", "#loop-shop", "#marketplace"],
    ventureId: "loop-shop",
    status: "[PIVOT_LEARNING]",
    summary: "Discovered students didn't want a complex e-commerce catalog for peer sales—they wanted a quick 15-second listing flow with zero account creation friction, verified via Loop ID.",
    takeaway: "Build what users actually do, not what they say they'd do in a survey. Simple trust signals beat complex feature bloat.",
    snippetLanguage: "text",
    codeSnippet: `Insight #01: 82% of students prefer instant pickup near canteen over shipping.
Insight #02: Trust issues plague informal WhatsApp buy/sell groups.
Action Item: Strip marketplace listing flow to 3 fields: Photo, Price, Pickup Spot.`
  },
  {
    id: "LOG-58",
    title: "Designing Controlled AI Gateway Architecture for Loop Learn",
    date: "2026-07-15",
    timestamp: "23:05 IST",
    category: "#ai-engineering",
    tags: ["#ai", "#security", "#golang", "#loop-learn"],
    ventureId: "loop-learn",
    status: "[IN_SPEC]",
    summary: "Ensured no client device can make direct LLM API calls. All AI requests pass through a Go rate-limiter, prompt sanitizer, and token quota manager.",
    takeaway: "Client applications should act as rendering coordinators, not authorities. Exposing raw API keys on the frontend is a security disaster.",
    snippetLanguage: "go",
    codeSnippet: `// EnforceQuotaAndSanitize checks student token budget before proxying to Gemini API
func (g *AIGateway) ProxyPrompt(w http.ResponseWriter, r *http.Request) {
    studentID := r.Header.Get("X-Student-ID")
    if !g.quota.Allow(studentID) {
        http.Error(w, "Daily AI quota reached", http.StatusTooManyRequests)
        return
    }
    // Sanitize input prompt for academic boundary rules
}`
  }
];

export const buildCategories = [
  "ALL_LOGS",
  "#golang",
  "#security",
  "#fundraising",
  "#architecture",
  "#user-validation",
  "#ai-engineering"
];
