import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { events } from '../../common/js/tools'
import { Service } from "../app.service";

@Controller()
export class EventsController {
    constructor(private readonly service: Service) { }

    @EventPattern(events.ARTICLE_DELETED)
    async handleArticleDeleted(data: Record<string, unknown>) {
        const { id } = data;
        return await this.service.removeMany({ articleId: id })
    }
}