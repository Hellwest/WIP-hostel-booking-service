import {
  TerminusEndpoint,
  TerminusOptionsFactory,
  DNSHealthIndicator,
  TerminusModuleOptions,
  HealthIndicatorResult,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus"
import { Injectable } from "@nestjs/common"

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly database: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: "/healthz",
      healthIndicators: [
        async (): Promise<HealthIndicatorResult> =>
          this.dns.pingCheck("google", "https://google.com"),

        async (): Promise<HealthIndicatorResult> =>
          this.database.pingCheck("database", { timeout: 300 }),

        async (): Promise<HealthIndicatorResult> =>
          this.disk.checkStorage("storage", {
            thresholdPercent: 0.75,
            path: "/",
          }),

        // The process should not use more than 1GB memory
        async (): Promise<HealthIndicatorResult> =>
          this.memory.checkHeap("memory_heap", 2 * 1024 * 1024 * 1024),

        // The process should not have more than 1GB allocated
        async (): Promise<HealthIndicatorResult> =>
          this.memory.checkRSS("memory_rss", 2 * 1024 * 1024 * 1024),
      ],
    }

    return {
      endpoints: [healthEndpoint],
    }
  }
}
